# Documentation

Harmony DNS answers DNS queries on your Mac. Names in your own zones are answered from records you manage in the app; every other name is forwarded to the upstream server you choose.

## Getting started

1. Download Harmony DNS from the Apple App Store. It needs macOS 13 Ventura or later.
2. Open the app. The first start asks you to allow a VPN configuration; choose **Allow**. Only DNS questions go through it (see How queries reach Harmony DNS below).
3. Open **Upstream DNS** and add the server that should answer names outside your own zones.
4. Optionally open **Zones** and add your own domain and its records.

Closing the window keeps the app running in the menu bar. The menu bar icon opens a menu with Dashboard, Zones, Statistics, Settings, Documentation and About, along with **Pause** (Resume while paused), **Restart** and **Quit Harmony DNS**.

## Zones

A zone is a domain, such as `home.lan`, together with its records. You can add up to two zones, each with up to six records.

- **Add zone** takes a name, an optional address for the zone name itself (an IPv4 or IPv6 address) and an optional default TTL (300 seconds when left empty). A zone name cannot be changed afterwards.
- Click a zone to see its records. A record is one name: `www`, `@` for the zone itself, or a full name. Each record can hold several values of the types `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `NS`, `SRV`, `PTR` and `CAA`.
- To answer for the zone name itself, such as `home.lan`, enter an address when you add the zone, or later add a record named `@` (the **@** button fills it in). The zone itself cannot be a CNAME, and a CNAME must be a record's only value.
- Zones and records can be switched off without deleting them. Deleting a zone deletes its records.

## Upstream DNS

Names that are not in one of your zones are forwarded to your upstream server. Open **Upstream DNS** and choose **Add server**. One upstream server can be configured. Use the switch to turn it off without deleting it, the pencil to change it, and **Test** to check that the server answers and how fast.

### Server types

- **Standard DNS** (port 53) works with every DNS server, but the questions and answers travel unencrypted.
- **DNS over HTTPS (DoH)** sends each question as an HTTPS request, normally on port 443. To the network it looks like ordinary web traffic.
- **DNS over TLS (DoT)** wraps standard DNS in a TLS connection on its own port, normally 853.

For DoH and DoT, pick Cloudflare, Google, NextDNS or AdGuard from the list and nothing else needs to be typed. A standard DNS server of your own needs only its IP address, and its port if it is not 53.

### Why use DoH or DoT

- **Privacy:** standard DNS shows every name you look up to anyone on the path, such as the Wi-Fi network owner or your Internet provider. With DoH and DoT the questions are encrypted, so those parties can no longer read them.
- **Protection against tampering:** the server proves its identity with a certificate, and the answers cannot be changed on the way. This stops spoofed answers that send you to a fake site and the redirects some networks inject.
- **Fewer ways to be blocked or filtered:** encrypted queries cannot be selectively dropped or rewritten by a network that only sees the connection.
- **Choice of provider:** you decide who answers your queries, and several providers offer security filtering or a stated no-logging policy.

> Encryption protects the trip, not the destination: the provider you choose still sees your queries, so pick one whose privacy policy you trust. The sites you visit also remain visible by their IP addresses.

### Blocking ads and trackers

Choose **AdGuard** as your DoH or DoT provider. AdGuard DNS refuses to resolve the names of known ad and tracking servers, so ads and trackers are blocked in every browser and app on your Mac.

### How Harmony DNS connects

The app connects directly to the stored IP address of a DoH or DoT provider, so reaching it never depends on another DNS lookup. It still checks the server's certificate against its name, so a wrong or hijacked address is refused.

## How queries reach Harmony DNS

While the DNS service runs, Harmony DNS is the DNS server for your whole Mac. macOS shows it as a VPN named Harmony DNS in **System Settings → VPN**, but only DNS questions go through it; all other traffic is untouched. The service starts when the app starts, and quitting the app hands DNS back to your network.

Each name is answered from your own zones first, then from the cache, then by your upstream server.

## Dashboard

The Dashboard shows whether the DNS service is running, how many queries were answered in the last 8 hours and from where (own zones, forwarded upstream, cache hits), and the ten newest queries. Open Statistics or Logs for more.

## Logs

Every answered query is logged and kept for 8 hours. **Logs** lists them newest first, one line each: time, name, record type, result (response code), source (own zone, upstream, cache or Cache+; upstream answers also show DNS, DoH or DoT) and how long the answer took.

- The search field filters by part of the name; press Return to search.
- The filter button filters by record type, result and source. A number on the button says how many filters are set.
- Column headers sort the list, and the bar below it pages through the rows and sets how many are shown per page.
- The refresh button reads the log again, and the trash button clears it after a confirmation.

## Statistics

Statistics counts the answered queries over the last **1h**, **2h**, **4h** or **8h**: total queries, answers from your own zones, the cache hit rate and failed answers (a response code other than NOERROR or NXDOMAIN). The chart shows where the answers came from: your own zones, the upstream server, the cache, or Cache+. Hover a bar for its numbers, or press **Table** to see them as a table. Below the chart are the ten most requested names and the response codes seen.

The log is kept for 8 hours, so 8h is the longest range. Clearing the log also clears the statistics.

## Pause and restart

**Pause**, on the Dashboard or in the menu bar, stops answering from your own zones: those names are forwarded upstream like any other until you **Resume**. **Restart** stops the DNS service and starts it again, and starts it when it is stopped. On the Dashboard both are icon buttons in the service status box; hover for their names.

## Caching

Answers are cached for as long as their TTL allows. Cache+ keeps answers a while longer, so names keep resolving when an upstream server is briefly unreachable. In **Settings → Caching** a switch keeps answers one hour past their TTL. The extra hour speeds names up, but you may get an outdated address for up to an hour after it changes. Answers served past their TTL are marked Cache+ in the Logs and Statistics.

## Appearance

**Settings → Appearance** chooses the color scheme: match the system, light or dark.
