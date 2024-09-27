
import Base from '../../../base';
 
import dynamic from 'next/dynamic';


const Categories = dynamic(() => import('./categories'), {
  ssr: false
})

export default async function ProductsListView() {

    return (
     
      <Base pageTitle={"Categories"}>
          <main >{
              Categories()
              }</main>
      </Base>
       
        
      
    );
  }
