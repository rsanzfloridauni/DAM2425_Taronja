import { createContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
  const [text, setText] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [photo, setPhoto] = useState('');
  const [uploadPicture, setUploadPicture] = useState(null);
  const [previousProfilePic, setPreviousProfilePic] = useState(null);
  const [animales, setAnimales] = useState([]);
  const [animalesPost, setAnimalesPost] = useState([]);
  const [posts, setPosts] = useState([]);
  const [informacionUsuario, setInformacionUsuario] = useState(null);
  const [ubicacion, setUbicacion] = useState({ latitud: null, longitud: null });
  const [visCarg, setVisCarg] = useState(false);
  const [infCar, setInfCar] = useState(false);
  const [currentPhotoId, setCurrentPhotoId] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState(null);

  return ( 
    <Context.Provider
      value={{
        text,
        setText,
        photo,
        setPhoto,
        currentPhoto,
        setCurrentPhoto,
        previousProfilePic,
        setPreviousProfilePic,
        uploadPicture,
        setUploadPicture,
        animales,
        setAnimales,
        informacionUsuario,
        setInformacionUsuario,
        ubicacion,
        setUbicacion,
        posts, 
        setPosts,
        visCarg,
        setVisCarg,
        infCar,
        setInfCar,
        currentPhotoId,
        setCurrentPhotoId,
        selectedPhoto, 
        setSelectedPhoto,
        selectedName,
        setSelectedName,
        animalesPost,
        setAnimalesPost,
        nombreUsuario,
        setNombreUsuario
      }}>
      {children}
    </Context.Provider>
  );
};
export default Context;
