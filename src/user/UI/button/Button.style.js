import { styled } from "styled-components";

const BaseButton = styled.button({
    borderRadius: '50px',
    padding: '8px 25px',
    whiteSpace: 'nowrap',
    transition: '0.3s',
    fontSize: '14px',
    display: 'inline-block',
    border: 'none',
});

export const PrimaryButton = styled(BaseButton)({
    background: props => props.disabled ? '#dddddd' : '#7d2ae8;',
    color: '#fff',
    width: '100%',

    '&:hover': {
        background: '#5b13b9'
    }

})
export const SecondaryButton = styled(BaseButton)({
    background: 'orange',
    color: '#fff',
    '&:hover': {
        background: '#166ab5',
        color: '#fff',
    },
})
export const OutlinedButton = styled(BaseButton)({
    background: 'none',
    color: '#FF6337',
    border: '1px solid #FF6337',
    '&:hover': {
        background: '#FF6337',
        color: '#fff',
    },
})