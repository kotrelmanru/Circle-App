import React from 'react';
import { useAppDispatch } from '../../../../store/store';
import { API } from '../../../../lib/api';
import { myProfileAsync } from '../../../../store/Asyncthunks/profileAsync';
import { getProfileAsync } from '../../../../store/Asyncthunks/GetProfileAsync';

interface IUpdateForm {
    fullname: string,
    profile: {
        photoProfile: File | null,
        cover: File | null,
        username: string,
        bio: string
    }
}

interface Iprops {
    userId: string
    initialData?: IUpdateForm;
}

const useEditProfile = ({ userId, initialData }: Iprops) => {
    const [open, setOpen] = React.useState(false);
    const [edit,setEdit] = React.useState(false)
    const [updateForm, setUpdateForm] = React.useState<IUpdateForm>(initialData || {
        fullname: "",
        profile: {
            bio: "",
            username: "",
            cover: null,
            photoProfile: null,
        }
    });

    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();

    const editProfile = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            setEdit(true)
            const formData = new FormData();

            formData.append("fullname", updateForm.fullname);
            formData.append("username", updateForm.profile.username);
            formData.append("bio", updateForm.profile.bio);

            if (updateForm.profile.photoProfile) formData.append("photoProfile", updateForm.profile.photoProfile);
            if (updateForm.profile.cover) formData.append("cover", updateForm.profile.cover);

            const res = await API.put('/profile/update', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(res.data);
            handleClose();
            dispatch(myProfileAsync());
            dispatch(getProfileAsync(userId));
        } catch (error) {
            console.log(error);
        }finally{
            setEdit(false)
        }
    }

    return { updateForm, setUpdateForm, editProfile, open, setOpen, handleClose,edit };
}

export default useEditProfile;
