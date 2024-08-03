import styled from 'styled-components';
import { Button } from '../../../../components';

const ModalContainer = ({ className, show, onClose, children }) => {
	if (!show) {
		return null;
	}

	return (
		<div className={className}>
			<div className="modal-content">
				<div className="modal-header">
					<Button onClick={onClose}>X</Button>
				</div>
				<div className="modal-body">{children}</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #6e4d7c;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;

	.modal-content {
		background: white;
		padding: 20px;
		border-radius: 8px;
		max-width: 500px;
		width: 100%;
	}

	.modal-header {
		position: relative;
		top: -18px;
		left: 446px;
		width: 32px;
	}

	.modal-body {
		margin-top: -50px;
		& input {
			border: 1px solid #6e4d7c;
			border-radius: 4px;
		}
	}
`;
