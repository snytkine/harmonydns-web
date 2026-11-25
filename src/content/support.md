# Support

Need help with Harmony DNS, found a bug or have an idea for a new feature? We would love to hear from you.

## Get in touch

Open an issue on [GitHub](https://github.com/snytkine/harmonydns-web/issues). Please include your macOS version, the Harmony DNS version (shown in **About** in the menu bar menu) and the steps that lead to the problem.

Before you write, the [documentation](/documentation) and the answers below may already have what you need.

## Common questions

### macOS asks to add a VPN configuration. Is that safe?

Yes. Harmony DNS uses the macOS VPN mechanism only to receive the DNS questions your Mac asks. All other traffic is untouched and goes straight to your network. Choose **Allow** on the first start; the configuration appears as Harmony DNS in **System Settings → VPN**.

### Names stop resolving while Harmony DNS runs

Open **Upstream DNS** and press **Test** next to your server. If the test fails, switch to another provider or protocol, for example from DoT to DoH, since some networks block port 853. Check that the server is switched on.

### A name from my own zone does not resolve

Check that the zone and the record are both switched on, and that the DNS service is not paused: while paused, names in your own zones are forwarded upstream. **Resume** is on the Dashboard and in the menu bar menu.

### A website still shows an old address

With **Cache+** on, an answer can be served for up to an hour past its TTL. Turn Cache+ off in **Settings → Caching**, or press **Restart** on the Dashboard to start with an empty cache.

### How do I stop using Harmony DNS?

Choose **Quit Harmony DNS** in the menu bar menu. DNS goes back to your network's servers right away.

### How many zones and records can I add?

Up to two zones with up to six records each, and one upstream server.
