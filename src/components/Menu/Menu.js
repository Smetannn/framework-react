
const Menu = ({ showPage }) => {
 return (<div>
  <button onClick={() => showPage('esse')}>Esse</button>
  <button onClick={() => showPage('calc')}>Calc</button>
  <button onClick={() => showPage('rpg')}>RPG</button>
  <button onClick={() => showPage('graph2d')}>Graph2D</button>
  <button onClick={() => showPage('graph3d')}>Graph3D</button>
  
 </div>);
}


export default Menu;