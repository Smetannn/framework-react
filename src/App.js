import Menu from './components/Menu/Menu';
import Esse from './components/Esse/Esse';
import Calc from './components/Calc/Calc';
import RPG from './components/RPG/RPG';
import Graph2D from './components/Graph2D/Graph2D';
import Graph3D from './components/Graph3D/Graph3D';
import { useState } from 'react';


const App = () => {
 const[page, setPage] = useState('Graph3D');
 return( <div> 
 <Menu showPage={setPage} />
 {page === 'esse' && <Esse />}
 {page === 'calc' && <Calc />}
 {page === 'rpg' && <RPG />}
 {page === 'graph2d' && <Graph2D />}
 {page === 'graph3d' && <Graph3D />}
 </div>
)
}

export default App;
