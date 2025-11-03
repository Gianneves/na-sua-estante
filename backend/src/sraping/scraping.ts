import dotenv from "dotenv";
dotenv.config();
import puppeteer from 'puppeteer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { prisma } from '../lib/prisma.ts';



const browser = await puppeteer.launch();
const page = await browser.newPage();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
console.log("DB URL runtime:", process.env.DATABASE_URL)

const screenshotDir = path.join(
    __dirname,
    "../public/screenshotsCover"
)

if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true })
    console.log(`${screenshotDir} created with success`)
}

let bookNumber = 1

interface Book {
    title: string
    category: string,
    price: number,
    description: string,
    cover: string
}

async function scrapeData(hrefs: string[]) {
    console.log('scraping data')
    const data: Book[] = []
    for (const url of hrefs) {

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // find all category
        const allCategory = await page.$$eval('ul.breadcrumb > li', ca => ca.map(c => c.textContent || ''))

        let category = ''
        if (allCategory[2]?.trim()) {
            category = allCategory[2]?.trim()
        }

        const title = await page.$eval('div.col-sm-6.product_main > h1', el => el.textContent || '')
        const getPrice = await page.$eval('div.col-sm-6.product_main > p.price_color', el => el.textContent || '')
        const price = Number(getPrice.replace('£', '').trim()) ?? 0.0
        const description = await page.$eval('article.product_page > p', el => el.textContent || '')

        await page.waitForSelector('div.item.active', { visible: true });
        const cover = await page.$('div.item.active')
        const safeTitle = String(title).replace(/[\\/:*?"<>|]+/g, '_').trim();
        const coverName = (`cover_${safeTitle}_${bookNumber}.png`) as const;
        const filePath = path.join(screenshotDir, coverName) as `${string}.png`;

        await cover?.screenshot({
            path: filePath
        })

        const book: Book = {
            title: title,
            category: category,
            price: price,
            description: description,
            cover: filePath
        }

        data.push(book)
    }

    return data
}


async function saveData(data: Array<Book>): Promise<void> {
    try {
        console.log("saving data...")

        for (const book of data) {
            await prisma.book.create({
                data: {
                    title: book.title,
                    category: book.category,
                    price: book.price,
                    description: book.description,
                    cover: book.cover
                }
            })
        }




        console.log("data saved")
    } catch (e) {
        console.log(e)
    }
}


let currentPage = 1;


(async function scraping() {
    console.log('starting scraping')

    let hasNextPage = true
    console.log('current page: ' + currentPage)
    await page.goto(`https://books.toscrape.com/catalogue/page-${currentPage}.html`, { waitUntil: 'domcontentloaded' });

    const hrefs = await page.$$eval('ol.row > li h3 a', as => as.map(a => a.href));

    try {
        while (hasNextPage) {
            const data = await scrapeData(hrefs)

            await saveData(data)

            const nextButton = await page.$('li.next')

            if (!nextButton) {
                hasNextPage = false
                break
            }
        }

        currentPage++
        bookNumber++
        await scraping()

    } catch (e) {
        console.log(e)
    }

    await browser.close()
})()



