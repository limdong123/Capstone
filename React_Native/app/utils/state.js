import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

const photoState = atom({
    key: 'photoState',
    default: null
})

const SignUpPhotoState = atom({
    key: 'SignUpPhotoState',
    default: null
})

export { photoState, SignUpPhotoState }