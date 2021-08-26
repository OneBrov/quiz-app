import clsx from 'clsx'
import React from 'react'

interface InputWithTitleProps {
    value?:any
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void
    title: string
    description?: string
    placeholder?: string
    className?: string
    type?: 'text' | 'file'
    fileType? : 'image/*' | "audio/*"
}

export const InputWithTitle:React.FC<InputWithTitleProps> = ( 
    {value, onChange, title, description, placeholder, className, type='text', fileType=null} ) => {
    return (
        <div className={clsx('d-flex', 'flex-column', className)}>
            <h2 className="mb-0">{title}</h2>
            <p className="mb-1 text-secondary">{description}</p>
            <input 
                className="mt-1 mx-4 field"
                type={type}
                accept={fileType && fileType}
                placeholder={placeholder ? placeholder : ''} 
                value={value}
                onChange={onChange} 
            />
        </div>
    )
}
