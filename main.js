document.body.classList.remove('fade-out');
window.addEventListener('pageshow', () => document.body.classList.remove('fade-out'));

document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => { window.location.href = link.href; }, 300);
    });
});

const footer = document.querySelector('.game-footer');
if (footer) {
    footer.innerHTML = `
        <p>© ${new Date().getFullYear()} 3002915425. All Rights Reserved.</p>
        <p>v1.0.0 - Built by Shahan Dayal.</p>`;
}

const startBtn = document.querySelector('.start-button');
if (startBtn) {
    setInterval(() => startBtn.classList.toggle('dim'), 700);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') startBtn.click();
    });
}

const menuItems = document.querySelectorAll('.menu-link, .menu-back-button');
if (menuItems.length) {
    let index = 0;
    const highlight = () => {
        menuItems.forEach((item, i) => item.classList.toggle('selected', i === index));
    };
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            index = (index + 1) % menuItems.length;
            highlight();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            index = (index - 1 + menuItems.length) % menuItems.length;
            highlight();
        } else if (e.key === 'Enter') {
            menuItems[index].click();
        }
    });
    menuItems.forEach((item, i) => {
        item.addEventListener('mouseenter', () => { index = i; highlight(); });
    });
    highlight();
}

const bodyText = document.querySelector('.body-text');
if (bodyText) {
    const html = bodyText.innerHTML.trim();
    bodyText.innerHTML = '';
    let i = 0;
    const type = () => {
        if (html[i] === '<') i = html.indexOf('>', i) + 1; // don't break tags
        else i++;
        bodyText.innerHTML = html.slice(0, i);
        if (i < html.length) setTimeout(type, 20);
    };
    type();
}