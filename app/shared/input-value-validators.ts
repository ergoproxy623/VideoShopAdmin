import { FormControl } from '@angular/forms';
// validation file type
export function requiredValueInput() {

    return ( control: FormControl ) => {
        const file = control.value;
        if ( file ) {
            const extension = file.value;

            if ( extension !== null ) {
               return null;
            }
            return {
                requiredValueInput: true
            };
        }

        return null;
    };

}
