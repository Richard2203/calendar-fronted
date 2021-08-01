/*
? PASOS PARA AÑADIR ENZYME ?

1.- Para agregar enzyme al proyecto se deben de ejecutar los siguientes comandos:
    npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17

1.1.-
    Si da error de "no se encuentra enzyme de src/setupTests.js" entonces
    ejecutar el siguiente comando
    npm install --save-dev enzyme

1.2.-
    en caso de dar error de no se encuentra el adaptador  ejecute
    el comando:
    npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps

2.- Posteriormente en este archivo se deben de agregar las siguientes lineas
    pertenecientes a la instalacion anterior

    import Enzyme from 'enzyme';
    import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

    Enzyme.configure({ adapter: new Adapter() });

3.-Se ejecuta este comando para crear un conector

    npm install --save-dev enzyme-to-json

4.- Se añade a este archivo las siguientes lineas de codigo pertenecientes
    a la instalacion anterior

    import {createSerializer} from 'enzyme-to-json';
    expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

5.- Para realizar pruebas en Redux se emplea la instalacion: 
    npm install redux-mock-store --save-dev

*/

import '@testing-library/jest-dom';
//esta linea permite emplear enzyme con json
import { createSerializer } from 'enzyme-to-json';

//estas tres lineas vienen juntas y permiten el uso de Enzyme
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

//esta y la linea 34 vienen juntas
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

HTMLCanvasElement.prototype.getContext = () => {};
