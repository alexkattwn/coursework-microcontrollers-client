import { Link, useMatch } from 'react-router-dom'

const CustomLink = ({children, to, ...props}) => {

    const match = useMatch({
        path: to,
        end: to.length === 1,
    })

    return (
        <Link 
            to={to} 
            style={{
                color: match ? 'var(--color-active)' : 'wheat',
                cursor: match ? 'default' : 'pointer'
            }}
            {...props}
        >
            {children}
        </Link>
    )
}

export {CustomLink}