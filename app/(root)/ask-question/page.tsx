import Question from '@/components/forms/Question';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "DevExchange | Ask a question",
  description: "Ask a question and get answers from the community.",
};

const AskQuestion = async () => {
  const {  userId } = await auth();
  // const userId = 'dummy-clerk-id';

  if (!userId) redirect('/sign-in');
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-invert flex-center w-full">Ask a Question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
