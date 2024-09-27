
import Base from '../../../base';
 
import dynamic from 'next/dynamic';


const Products = dynamic(() => import('./products'), {
  ssr: false,
});


export default async function ProductsListView() {

   
    return (
     
      <Base pageTitle={"Products"}>
          <main >{
              Products()
              }</main>
      </Base>
       
        
      
    );
  }
