import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onRestartFeedback: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onRestartFeedback, onFeedbackSent }: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const feedbackInfo = feedbackTypes[feedbackType]

  function handlSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    console.log({
      screenshot,
      comment
    });

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button onClick={onRestartFeedback} type="button" className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackInfo.image.source} alt={feedbackInfo.image.alt} className="w-6 h-6" />
          {feedbackInfo.title}
        </span>
        
        <CloseButton />

      </header>
      <form className="my-4 w-full" onSubmit={handlSubmitFeedback}>
        <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontencendo"
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTaken={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment.length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  )
}