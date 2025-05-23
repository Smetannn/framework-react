import React from 'react';
import FirstPhoto from '../../img/FirstPhoto.jpg';
import Bunny from '../../img/Bunny.jpg';
import Shp from '../../img/Shp.jpg';
import Fireman from '../../img/Fireman.jpg';
import Cat from '../../gif/cat.gif';
import './esse.css';


const Esse=()=> {
        return (
            <div className="esse-container">
                <h1 className="heading1">Егор Сметанин</h1>
                <img src={Cat} alt="Cat" align="right" />
                <h2 className="heading2">@smetaneg</h2>
                <p>
                    <img src={FirstPhoto} alt="Egor Smetanin" height="320" width="250px" align="left" vspace="10" hspace="10" />
                </p>
                <p className="info-about-me">
                    Здравствуйте! Меня зовут Сметанин Егор. Я родился и вырос в Ижевске
                </p>

                <p className="info-about-me">
                    С детства я был социально-активным ребенком. Со второго класса я ездил в детские лагеря, вел активную жизнь,
                    участвовал в волонтерском отряде и был уверен, что моя будущая жизнь и профессия будет связана с работой с людьми.
                </p>

                <p className="info-about-me">
                    Первые сомнения появились в 8 классе, я начал обучаться в онлайн-школе и изучать язык Python. В 9 классе сдал ОГЭ по
                    информатике на максимальный балл и понял, что хочу углубляться в эту сферу. С 10 класса начал изучать другие языки
                    программирования, готовиться к ЕГЭ. В 10 классе ходили на экскурсию в "Центр высоких технологий". Был приятно удивлен
                    и замотивирован двигаться в сторону IT. При этом продолжал активную деятельность в качестве волонтера, стал работать в
                    детских лагерях старшим вожатым и педагогом-организатором. Долгое время не понимал, в какую сферу мне пойти учиться и
                    работать, как совместить желание работать с людьми и работать в технической сфере.
                </p>

                <p className="info-about-me">
                    Первое решение - экономика. Хотел поступать туда вплоть до середины 11 класса. В начале учебного года нашел работу -
                    теперь я организатор детских праздников. Ко мне пришло осознание, что мои потребности в социальной сфере закрываются и
                    можно полностью погрузиться в техническую сферу.
                </p>
                <h2 className="heading3">
                    Теперь я, Егор Сметанин - студент 1 курса Прикладной информатики УдГУ, а также организатор детских праздников
                </h2>
                <p style={{ textAlign: 'center' }}>
                    <img src={Shp} alt="Shp" width="20%" />
                    <img src={Fireman} alt="Fireman" hspace="10" width="45%" />
                    <img src={Bunny} alt="Bunny" width="20%" />
                </p>
            </div>
        );
    }


export default Esse;