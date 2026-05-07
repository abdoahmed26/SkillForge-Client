import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHooks";
import { loadConversations, loadMessages, setActiveConversation } from "../store/chatSlice";

export function useConversations() {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chat);

  useEffect(() => {
    void dispatch(loadConversations());
  }, [dispatch]);

  useEffect(() => {
    if (chat.activeConversationId && !chat.messagesByConversation[chat.activeConversationId]) {
      void dispatch(loadMessages(chat.activeConversationId));
    }
  }, [chat.activeConversationId, chat.messagesByConversation, dispatch]);

  return {
    ...chat,
    setActiveConversation: (id: string) => dispatch(setActiveConversation(id)),
  };
}
