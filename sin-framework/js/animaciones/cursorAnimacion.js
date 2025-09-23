const cursor =  document.querySelectorAll('.cursor');
const cursorDot =  document.querySelector('.cursor-dot');

window.addEventListener('mousemove', e => {
    let  x = e.pageX;
    let  y = e.pageY;

    cursor.forEach(el => {
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    });
});