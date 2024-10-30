// script.js
document.getElementById('hamburger').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    const menuContainer = document.getElementById('menuContainer');
    
    menu.classList.toggle('active'); // 메뉴 활성화
    menuContainer.style.transform = menu.classList.contains('active') ? 'translateX(250px)' : 'translateX(0)'; // 콘텐츠 이동
});
