const fs = require("fs");
const path = require("path");

const puppeteerBase = require("puppeteer");
const { addExtra } = require("puppeteer-extra");
const puppeteer = addExtra(puppeteerBase);
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

async function saveCookiesAndHeaders(page) {
  const cookies = await page.cookies();

  fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2));

  const headers = await page.evaluate(() => {
    return document.headers;
  });

  console.log(headers);
  //   fs.writeFileSync("headers.json", headers);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function main() {
  // Check if cookies.json and headers.json exist
  const cookiesExist = fs.existsSync(path.resolve("cookies.json"));
  const headersExist = fs.existsSync(path.resolve("headers.json"));

  if (!cookiesExist || !headersExist) {
    const puppeteerStealth = StealthPlugin();
    puppeteerStealth.enabledEvasions.delete("user-agent-override");
    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      targetFilter: (target) => target.type() !== "other",
    }); // Run in non-headless mode
    const page = await browser.newPage();

    try {
      const res = await page.goto("https://stake.bet/casino/games/crash", {
        waitUntil: "networkidle2",
      });

      await sleep(5000);
      await saveCookiesAndHeaders(page);

      console.log(res.headers());
      console.log(res);
      // Do something with gameId
    } catch (error) {
      console.error(
        `An error occurred during initial loading: ${error.message}`
      );
    } finally {
      await browser.close();
    }
  }
}

main();
