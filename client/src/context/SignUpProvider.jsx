import { SignUpContext } from './SignUpContext';
import { useState } from 'react';

export const SignUpProvider = ({ children }) => {

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [agents, setAgents] = useState([]);
    const [addedAgent, setAddedAgent] = useState({
        name: addedAgent.name || '',
        email: addedAgent.email || '',
        username: addedAgent.username || '',
        password: addedAgent.password || '',
        confirmPassword: addedAgent.confirmPassword || '',
        role: addedAgent.role || '',
        avatar: addedAgent.avatar || ''
    });

    const handleAvatarUpload = (url) => {
        setAddedAgent(prev => ({
            ...prev,
            avatar: url
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddedAgent(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/agents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: addedAgent.name || '',
                    email: addedAgent.email || '',
                    username: addedAgent.username || '',
                    password: addedAgent.password || '',
                    confirmPassword: addedAgent.confirmPassword || '',
                    role: addedAgent.role || '',
                    avatar: addedAgent.avatar || ''
                }),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || 'Signup failed');
            }

            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const token = localStorage.getItem('token');

    const fetchAgents = async () => {
        try {
            const res = await fetch('/api/agents');
            const data = await res.json();
            setAgents(data);
        } catch (err) {
            console.error('Failed to fetch agents: ', err);
        }
    };

    const createAgent = async (agent) => {
        try {
            const res = await fetch('/api/agents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(agent),
            });

            if (!res.ok) throw new Error('Creating Agent Failed');
            const newAgent = await res.json();
            setAgents((prev) => [...prev, newAgent]);
            setAddedAgent({
                name: newAgent.name,
                email: newAgent.email,
                username: newAgent.username,
                password: newAgent.password,
                confirmPassword: newAgent.confirmPassword,
                role: newAgent.role,
                avatar: newAgent.avatar
            });
            return newAgent;
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <SignUpContext.Provider value={{
            agents,
            addedAgent,
            fetchAgents,
            createAgent,
            handleAvatarUpload,
            handleChange,
            handleSubmit,
            submitting,
            success,
            error
        }}>
            {children}
        </SignUpContext.Provider>
    );
};
