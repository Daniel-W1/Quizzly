import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useProfileStore } from '@/stores/profile-store'

const UseProfileFetch = () => {
    const [loading, setLoading] = useState(true);
    const { profile, setProfile } = useProfileStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isMounted) return;

        const fetchProfile = async () => {
            if (!profile) {
                try {
                    console.log('fetching profile')
                    const res = await axios.get('/api/profile');
                    setProfile(res.data);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [profile, setProfile, isMounted]);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, [isMounted]);

    return { loading, profile, setProfile };
};

export default UseProfileFetch;