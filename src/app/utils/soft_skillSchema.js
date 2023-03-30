import * as Yup from 'yup';

export default Yup.object({
    name : Yup.string().min(3,'3 caractère minimum').max(30).required('nécessaires').trim('ne peut contenir que des espaces'),
    description : Yup.string().min(3,'3 caractère minimum').required('nécessaires').trim('ne peut contenir que des espaces')
})