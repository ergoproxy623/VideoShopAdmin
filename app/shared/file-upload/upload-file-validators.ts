import { FormControl } from '@angular/forms';
// validation file type
export function requiredFileType( type1, type2 ) {

    return ( control: FormControl ) => {
        const file = control.value;
        if ( file ) {
            const extension = file.name.split( '.' )[ 1 ].toLowerCase();

            if ( type1.toLowerCase() !== extension.toLowerCase() && type2.toLowerCase() !== extension.toLowerCase() ) {
                return {
                    requiredFileType: true
                };
            }

            return null;
        }

        return null;
    };

}
