import * as Yup from 'yup';

export default Yup.object({
    email: Yup.string().required('Le champ email est requis').email('Veuillez saisir une adresse email valide'),
    lastname: Yup.string().required('Merci de renseigner votre nom'),
    firstname: Yup.string().required('Merci de renseigner votre prénom'),
    username: Yup.string().required("Veuillez choisir un nom d'utilisateur-trice"),
    password: Yup.string().required('Le champ mot de passe est requis').min(8, 'Le mot de passe doit avoir au moins 8 caractères'),
    passwordConfirmation: Yup.string().required('Merci de confirmer votre mot de passe').oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
});