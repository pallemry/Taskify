import { createContext, useState } from 'react'

type Props = React.PropsWithChildren;

export interface IConsoleContext {
    saveConsole: Console;
}

export const ConsoleContext = createContext<IConsoleContext>({ saveConsole: console })

export default function ConsoleProvider({ children }: Props) {
    const [saveConsole, setSaveConsole] = useState(console);

    return (
        <ConsoleContext.Provider value={{ saveConsole }}>
            {
                children
            }
        </ConsoleContext.Provider>
    )
}