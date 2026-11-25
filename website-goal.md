create a modern web application that uses react.js, and utilized modern HTML 5 features. Website must render well in browser as well as in mobile devices.

The goal of the website is to promote this the MacOS app called "Harmony DNS"

The source code of harmonydns app, including the UI, which is also designed in React.js is available in a sibling project ../harmonydns
Use same color scheme as the MacOS app. 
For overall website design replicate a design from another sibling project ../demanddns-web

The layout and overall design of this website should resemble a modern MacOS desktop application. 

The backgound will have no background images.

The website will have a header with the project name "Demand DNS" and a navigation menu with items:
- Home
- Features
- Documentation
- Support
- Privacy policy

Use screenshot images from the /Users/dmitrisnytkine/Desktop/harmonydns-app-screenshots folder on various sections on the site. Add the 'dashboard' screenshot to the 'home page', add other screenthots to features page. Resize screenshots as needed so that website displayes reasonably small size of screenshots but not too small. Allow clicking on image to open a larger version of the image in a modal.

On home page add into text that mentions some of the selling points of the app: 
- Administer own DNS zones, perfect for home labs and small businesses when you need to assign real DNS names to local IP addresses. 
- Use Secure DNS over HTTPS for enhanced privacy and security for all DNS requests on your machine, not just from browsers.
- Use adguard-dns as DNS server to automatically block ads and tracking in all browsers and all apps on your machine.
- Detailed logs for all DNS requests made by all browsers and apps on your machine.
- Increase performance with enhanced DNS caching.

The navigation items will also have graphical icons next to them. The icons will be in modern design and have effect of 3D with minimal animation on mouseover. The icons will have an effect of "Glass" visual effect with light reflection. 

The transition between pages should have a smooth transition animation effect. 

Create a new React.js project using Vite. Must use typescript with strong types. Website must be easy to maintain and to update the content. The content of individual pages should be stored as markdown files. The website must have a footer with copyright information and a current year which will be set dynamically in the format "Copyright © 2026 - [current year] Harmony DNS" If current year is 2026 then only should be displayed as "Copyright © 2026 Harmony DNS".

The home page should include 3 blocks - Features, How it works, and Get the App. Get the App will have text instructing user to download the app from the Apple App Store. Each block should be a card with an icon, title.

The website should have a "Light/Dark" mode switch visible on the top right corner of the page. The switch should be able to toggle between light and dark mode and the switch should be in a form of toggle commonly used in MacOS applications.

Get the list of features from the ../harmonydns project
Get the documentation from the documentation in the ../harmonydns app's documentation section. 

Before using any content from ../harmonydns make sure to checkout the free-app branch in that project because this website will be for the free app.


