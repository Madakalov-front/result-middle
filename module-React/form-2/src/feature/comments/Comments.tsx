import { useOptimistic, useTransition } from "react";
import { useGetComments, type IComment } from "./model";

export const Comments = () => {
  const { loadComments, error, comments } = useGetComments();
  const [isPending, startTransition] = useTransition();

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments ?? [],
    (state: IComment[], newComment: IComment) => {
      return [...state, newComment];
    },
  );

  if (loadComments && !comments)
    return (
      <div className="flex space-x-2 justify-center items-center">
        <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
    );

  if (error) {
    return <div className="text-red-500 text-sm mt-1">⚠️ {error}</div>;
  }

  if (!comments) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = formData.get("comment")?.toString() ?? "empty";

    const tempId = Date.now();

    const optimisticComment: IComment = {
      id: tempId,
      postId: 1,
      name: "Pepe",
      email: `${body}@gg.com`,
      body,
    };

    startTransition(() => {
      addOptimisticComment(optimisticComment);
      form.reset();
    });

    try {
      await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        body: JSON.stringify({
          postId: 1,
          name: "Pepe",
          email: `${body}@gg.com`,
          body: body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const displayComments = optimisticComments;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Комментарии
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({displayComments.length})
          </span>
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Подписаться на обновления
        </button>
      </div>

      {/* Форма добавления комментария */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <img
            src="https://i.pravatar.cc/40?img=4"
            alt="Your avatar"
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              placeholder="Напишите комментарий..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              name="comment"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Отправка..." : "Отправить"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Список комментариев */}
      <div className="space-y-6">
        {displayComments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <img
              src={`https://i.pravatar.cc/40?img=${comment.id % 10}`}
              alt={comment.name}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">
                      {comment.name}
                    </span>
                    <span className="text-xs text-gray-500">22.02.2026</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-700">{comment.body}</p>
              </div>

              {/* Действия с комментарием */}
              <div className="flex items-center gap-4 mt-2 ml-2">
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <span>Нравится</span>
                </button>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  <span>Ответить</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка загрузить еще */}
      {comments.length >= 5 && (
        <div className="text-center mt-8">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Загрузить еще комментарии
          </button>
        </div>
      )}
    </div>
  );
};
