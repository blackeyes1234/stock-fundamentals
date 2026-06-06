import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-zinc-950">Create account</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Add your signup flow and email confirmation here.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-950"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
