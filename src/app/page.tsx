import Background from './components/Background';
import { LucioAquino } from './components/Lucio-Aquino';
import { Title } from './components/Title';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-scree h-full w-full">
      <div className="w-full relative flex justify-center items-center h-full"> 
        <Background/>
        <Title/>
        
      </div>

    </div>
  );


}
