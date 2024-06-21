export default function Inicio() {
    let slider = document.querySelector('.slider .list') as HTMLElement | null;
    let items = Array.from(document.querySelectorAll('.slider .list .item')) as HTMLElement[];
    let next = document.getElementById('next') as HTMLButtonElement | null;
    let prev = document.getElementById('prev') as HTMLButtonElement | null;
    let dots = document.querySelectorAll('.slider .dots li');
    
    let lengthItems = items.length - 1;
    let active = 0;
    if (next) {
        next.onclick = function(){
            active = active + 1 <= lengthItems ? active + 1 : 0;
            reloadSlider();
        }
    }
    if (prev) {
        prev.onclick = function(){
            active = active - 1 >= 0 ? active - 1 : lengthItems;
            reloadSlider();
        }
    }
    let refreshInterval = setInterval(()=> {if (next) next.click()}, 3000);
    function reloadSlider(){
        if (slider && items[active]) {
            slider.style.left = -items[active].offsetLeft + 'px';
        }
        // 
        let last_active_dot = document.querySelector('.slider .dots li.active');
        if (last_active_dot) {
            last_active_dot.classList.remove('active');
        }
        if (dots[active]) {
            dots[active].classList.add('active');
        }
    
        clearInterval(refreshInterval);
        refreshInterval = setInterval(()=> {if (next) next.click()}, 3000);
    }
    
    dots.forEach((li, key) => {
        li.addEventListener('click', ()=>{
            active = key;
            reloadSlider();
        })
    })
    window.onresize = function(_event) {
        reloadSlider();
    };



    return (
        <div className="page">
            <h1 className="tit-inicio">CONVIERTE TUS IDEAS EN INOVACIÓN</h1>
            <br />

            <div className="slider">
                <div className="list">
                    <div className="item">
                        <img src="src/assets/imagen-Ino3.webp" alt="" />
                    </div>
                    <div className="item">
                        <img src="src/assets/imagen-Ino2.webp" alt="" />
                    </div>
                    <div className="item">
                        <img src="src/assets/imagen-Ino1.webp" alt="" />
                    </div>
                </div>
                <div className="buttons">
                    <button id="prev">&lt;</button>
                    <button id="next">&gt;</button>
                </div>
                <ul className="dots">
                    <li className="active"></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div className="text-container">
                <p className="p-inicio">El Innovaction GYM es un centro de creatividad, diseño, </p>
                <p className="p-inicio">innovación y emprendimiento tecnológico en la Escuela </p>
                <p className="p-inicio"> de Ingeniería del Tec de Monterrey.</p>
            </div>
        </div>
    );
}