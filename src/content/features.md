# Features

Harmony DNS puts a complete DNS server on your Mac, with a clean, native-feeling interface in light and dark mode. Click any screenshot to see it larger.

## Your own DNS zones

Run your own domains, such as `home.lan` or `homeoffice.com`, and give real DNS names to the devices on your network: the NAS, the printer, the Raspberry Pi in the closet or the test server in your home lab. Perfect for home labs and small businesses.

- Add a zone with an optional address for the zone name itself and a default TTL.
- Records for `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `NS`, `SRV`, `PTR` and `CAA`, with several values per record.
- Switch zones and records off without deleting them.

![The Zones view, listing your own DNS zones](screenshot:zones) ![The records of one zone, each with its own on/off switch](screenshot:own-zone)

## Secure DNS over HTTPS and TLS

Every DNS question your Mac asks, from every app and not just from the browser, can travel encrypted. Pick **DNS over HTTPS (DoH)** or **DNS over TLS (DoT)** and choose Cloudflare, Google, NextDNS or AdGuard from the list: nothing needs to be typed. A standard DNS server of your own needs only its IP address.

- Encrypted queries keep the Wi-Fi owner and your Internet provider from reading the names you look up.
- The server proves its identity with a certificate, so answers cannot be spoofed or altered on the way.
- **Test** asks the server for the root name servers and shows whether, and how quickly, it answered.

![The Upstream DNS view with a configured server and its Test button](screenshot:upstream) ![Choosing a pre-configured DNS over HTTPS provider](screenshot:upstream-selection)

## Ad and tracker blocking

Choose **AdGuard** as your upstream server and ads and trackers are blocked in every browser and every app on your Mac, with no browser extensions to install.

## Detailed query logs

See every DNS request made by every browser and app on your Mac: the time, the name, the record type, the result, where the answer came from (your own zone, an upstream server, the cache or Cache+) and how long it took.

- Search by name, filter by record type, result or source, and sort by any column.
- The log is kept for 8 hours and can be cleared at any time.

![The Logs view, listing every answered DNS query](screenshot:logs)

## Statistics

Count the answered queries over the last 1, 2, 4 or 8 hours. A stacked chart shows where the answers came from; hover a bar for its numbers or switch to a table. Below are the most requested names and the response codes seen.

![The Statistics view with its query chart](screenshot:statistics)

## Faster with enhanced caching

Answers are cached for as long as their TTL allows, so repeated lookups are instant. Turn on **Cache+** and answers are kept for one more hour, so names keep resolving even while an upstream server is briefly unreachable.

![Settings: appearance and the Cache+ switch](screenshot:settings)

## Lives in your menu bar

Harmony DNS stays out of the way in the menu bar. From there you can open any view, **Pause** answering from your own zones, **Restart** the DNS service or quit. The Dashboard shows the state of the service, counters for the last 8 hours and the newest queries at a glance.

## Light and dark mode

The app follows your Mac's appearance, or you can pick light or dark yourself in Settings.

![Harmony DNS in dark mode](screenshot:dark-mode)

## Private by design

Your zones, settings and query log stay on your Mac. There is no account, no analytics and no advertising, and nothing is sent to the developer. Read the [privacy policy](/privacy).
