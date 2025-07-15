const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color
};

export const GenerateInitialsAvatar = ({ name, surname }) => {
    if (!name) return null;

    const nameInitial = name.charAt(0).toUpperCase();
    const surnameInitial = surname ? surname.charAt(0).toUpperCase() : '';

    const backgroundColor = getRandomColor();

    return (
        <div
        className="w-11 h-11 p-2 rounded-full flex items-center justify-center text-white font-bold"
        style={{ backgroundColor }}
        >
        <span className="text-sm font-semibold">
            {nameInitial}
            {surnameInitial}
        </span>
        </div>
    )
}

export const GenerateInitialsAvatarProfile = ({ name, surname }) => {
    if (!name) return null;

    const nameInitial = name.charAt(0).toUpperCase();
    const surnameInitial = surname ? surname.charAt(0).toUpperCase() : '';

    const backgroundColor = getRandomColor();

    return (
        <div
            className="w-[120px] h-[120px] rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor }}
        >
            <span className="text-4xl font-semibold">
                {nameInitial}
                {surnameInitial}
            </span>
        </div>
    )
}