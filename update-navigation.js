// Script to update all HTML files with new navigation structure
const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'campinfo.html',
    'teenspotlight.html', 
    'event.html',
    'mission.html',
    'ourstory.html',
    'ourvalues.html',
    '5-DaySummer.html',
    '🎓 School Partnerships.html',
    '🧠 Teen Business Incubator (Coming Soon).html'
];

const newNavStructure = `    <nav>
        <div class="nav-container">
            <div class="logo-container">
                <img src="images/img.png" alt="NextGen Bosses Logo" class="logo">
            </div>
            <button class="mobile-menu-btn" id="mobileMenuBtn">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="campinfo.html">Camp Info</a></li>
                <li><a href="teenspotlight.html">Teen Spotlight</a></li>
                <li><a href="index.html#gallery">Gallery</a></li>
                <li><a href="event.html">Events</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
    </nav>`;

const scriptTag = `    <script src="mobile-menu.js"></script>`;

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove old logo and nav structure
        content = content.replace(/<img src="images\/img\.png" alt="NextGen Bosses Logo" class="logo">\s*/, '');
        content = content.replace(/<nav>\s*<a[^>]*>.*?<\/nav>/s, newNavStructure);
        
        // Add script before closing body tag
        if (!content.includes('mobile-menu.js')) {
            content = content.replace(/<\/body>/, `${scriptTag}\n</body>`);
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});

console.log('Navigation update complete!');

