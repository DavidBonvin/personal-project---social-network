import * as Yup from 'yup';

export default Yup.object({
    name : Yup.string().min(3,'3 caractère minimum').max(30).required('obligatoire').trim('ne peut contenir que des espaces'),
    date_start : Yup.date().required('obligatoire').max(new Date(), "doit être superieure a la date d'aujourd'hui").min(new Date('1980-01-01'),"doit être supereire au 1er janvier 2000"),
    date_end : Yup.date().when('date_start',(date_start, schema) => (date_start && schema.min(date_start,"la date de fin doit etre superieur à la date de début"))),
    place : Yup.string().min(3,'3 caractère minimum').required('obligatoire').trim('ne peut contenir que des espaces'),
    description : Yup.string().min(3,'3 caractère minimum').required('obligatoire').trim('ne peut contenir que des espaces'),
})  