"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    const handleSignIn = async () => {
        try {
            await gitHubSignIn();
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    const handleSignOut = async () => {
        try {
            await firebaseSignOut();
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen gap-6">
            {!user ? (
                <>
                    <h1 className="text-2xl font-bold">Welcome to the Shopping List App</h1>
                    <button
                        onClick={handleSignIn}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        SignIn with GitHub
                    </button>
                </>
            ) : (
                <>
                    <p className="text-lg">
                        Signed in as <strong>{user.displayName}</strong> ({user.email})
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="/week-9/shopping-list"
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Go to Shopping List
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}
