// import React, { Component } from 'react';
// import { Input, Error } from './style';

// class TextField extends Component{
    
//     render(){
//         const { disabled, value, error } = this.props; 
//         if(Error){
//         return(
//             <>
//             <Input type="text" value={ value } disabled={ disabled } error/>
//             <br></br>
//             <Error >{ error }</Error> 
//             </>
            
//         )}
//         else{
//             return(
//                 <Input type="text" value={ value } disabled={ disabled } />
//             )
//         }
//     }
// }
// export default TextField;
import React, { Component } from 'react';
import { Error, Input } from './style'
class TextField extends Component {
render() {
const { value, disabled, error }= this.props;
if(error){
return(
<>
<Input type="text" value={ value } error/>
<Error>{error}</Error>
</>
)
}
return(
<Input type="text" value={ value } disabled={ disabled } />
)
}
}
export default TextField;
