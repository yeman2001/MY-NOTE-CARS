import React from 'react';
import { motion } from 'framer-motion';

export const MotionContainer = ({ children }) => {
    return (
        <motion.div
            className='big-con'
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
};

export default MotionContainer;
