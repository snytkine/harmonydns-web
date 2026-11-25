# Privacy policy

_Last updated: November 25, 2026_

Harmony DNS is built to keep your DNS private. This policy explains what data the Harmony DNS app keeps, how it is used, how long it is kept and how you can delete it. It also covers this website.

## Our commitment

Harmony DNS does not collect any data about you. We do not sell, use or disclose to third parties any data, for any purpose. This applies to everything the app handles, including your DNS queries, your zones and records, your settings and your query log.

The app has no account, no analytics, no crash reporting, no advertising and no third-party SDKs, and it sends nothing to the developer.

## Data the app keeps on your Mac

The app stores the following on your Mac only, in its app data folder (`~/Library/Application Support/com.harmonydns.app`) and, for the query log, in the folder it shares with its DNS extension (in `~/Library/Group Containers`, named after `group.com.harmonydns.shared`). Cached answers are kept only in memory. None of it is sent to the developer or to anyone else.

| Data                                                                                               | Why it is kept                                                          | How long it is kept                                                                           |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Your zones and records                                                                             | To answer DNS queries for your own domains                              | Until you delete them or delete the app                                                       |
| Your upstream DNS server and settings                                                              | To forward other queries and remember your preferences                  | Until you change them or delete the app                                                       |
| Query log: time, name, record type, result and source                                              | To show the Logs, Dashboard and Statistics views                        | 8 hours, then deleted automatically                                                           |
| Install record: first installed version, its date and, for App Store copies, the App Store receipt | To recognize early users if features are ever added as in-app purchases | Until you delete the app                                                                      |
| Cached DNS answers                                                                                 | To answer repeated queries faster                                       | Their time to live (TTL), plus one hour with Cache+ on; cleared when the DNS service restarts |

## How DNS queries are answered

Harmony DNS answers the DNS queries your Mac makes. A name in one of your own zones, or one already in the cache, is answered on your Mac. Every other name is sent to the upstream DNS server that **you** choose in the app, the same way your Mac would otherwise send it to your network's DNS server. This is the service you ask the app to provide.

- The query goes only to the server you chose: Cloudflare, Google, NextDNS, AdGuard or a standard DNS server whose address you entered. The app does not send your queries anywhere else.
- With DNS over HTTPS or DNS over TLS the query is encrypted on its way, so others on the network cannot read it.
- The developer has no agreement with any of these providers, receives nothing from them and shares no data with them. Each provider handles the queries it receives under its own privacy policy, so choose one whose policy you trust. You can change or switch off the upstream server at any time in **Upstream DNS**.

## VPN configuration

Harmony DNS uses a macOS VPN configuration only to receive the DNS queries your Mac makes. No other network traffic passes through it, and nothing is sent to the developer.

## Withdrawing consent and deleting your data

You stay in control of the app and everything it keeps:

- **Clear the query log** at any time with the trash button in **Logs**. This also clears the statistics.
- **Delete zones, records and the upstream server** in the app at any time.
- **Stop Harmony DNS answering your DNS queries** by choosing **Quit Harmony DNS** in the menu bar menu. DNS goes back to your network right away.
- **Withdraw the VPN permission** by removing Harmony DNS in **System Settings → VPN**.
- **Delete all data** by quitting and deleting the app, then removing its two folders, which macOS may leave behind: `~/Library/Application Support/com.harmonydns.app` and the folder in `~/Library/Group Containers` whose name ends in `group.com.harmonydns.shared`.

Because no data ever reaches the developer, there is nothing for us to delete on our side and no request is needed.

## This website

This website has no cookies, analytics or tracking. Your light or dark mode choice is saved in your browser's local storage and never leaves your device; clearing your browser's site data removes it. The site is hosted on GitHub Pages, and GitHub may log technical information such as IP addresses to operate the service; see the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## Children

Harmony DNS does not collect information from anyone, including children under 13.

## Changes to this policy

If this policy changes, the new version will be posted on this page with a new date.

## Contact

Questions about this policy can be asked on the [Support](/support) page.
