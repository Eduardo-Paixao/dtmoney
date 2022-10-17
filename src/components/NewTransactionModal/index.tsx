import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { api } from "../../services/api";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface NewTransactionModalProps {
  isPoen: boolean;
  onRequestClose: () => void;
}

interface ITransactions {
  title?: string;
  velue?: number;
  type?: string;
  category?: string;
}

Modal.setAppElement("#root");

export const NewTransactionModal = ({
  isPoen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const [type, setType] = useState("");
  const [transaction, setTransaction] = useState<ITransactions>();

  const handleCreateNewTransactions = (event: FormEvent) => {
    event.preventDefault();
    api.post('/transactions', transaction)
  };

  return (
    <Modal
      isOpen={isPoen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-colse"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={(event) => handleCreateNewTransactions(event)}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Título"
          onBlur={(event) =>
            setTransaction((transaction) => ({
              ...transaction,
              title: event.target.value,
            }))
          }
        />
        <input
          type="number"
          placeholder="Valor"
          onBlur={(event) => {
            setTransaction((transaction) => ({
              ...transaction,
              value: Number(event.target.value),
            }));
          }}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setType("deposit");
              setTransaction((transaction) => ({
                ...transaction,
                type: "deposit",
              }));
            }}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => {
              setType("withdraw");
              setTransaction((transaction) => ({
                ...transaction,
                type: "withdraw",
              }));
            }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saìda" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          type="text"
          placeholder="Categoria"
          onBlur={(event) => {
            setTransaction((transaction) => ({
              ...transaction,
              category: event.target.value,
            }));
          }}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};
