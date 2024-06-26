import { FaClock } from "react-icons/fa6";
import Tag from "../common/tag";
import { IslandMeta, IslandType } from "@/data/model";
import { RiMedal2Line } from "react-icons/ri";
import OutlinedBox from "../common/outlined-box";
import DiagLines from "../common/decos/diag-lines";
import Link from "next/link";
import { OSS } from "@/data/backend";
import clsx from "clsx";
import { TbClockQuestion } from "react-icons/tb";
import SpTag from "../common/sp-tag";

export default async function IslandCard({ island }: { island: IslandMeta }) {
    return (
        <div className="relative">
            <OutlinedBox className={clsx(
                "flex flex-col justify-between w-full p-4 shadow-md gap-2 min-h-[200px]",
                { "border-dashed": island.wip }
            )}
            >
                {
                    island.ty == IslandType.Article
                        ? <Link href={`/island?id=${island.id}`}><CardMain card={island}></CardMain></Link>
                        : <CardMain card={island}></CardMain>
                }
                <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                        {
                            island.tags.map(tag => (
                                <Tag tag={tag} key={tag.id}></Tag>
                            ))
                        }
                        {island.wip && <SpTag content="WIP"></SpTag>}
                        {!island.is_original && <SpTag content="非原创"></SpTag>}
                    </div>
                    {
                        island.wip
                            ? <div className="flex items-center gap-1">
                                <TbClockQuestion className="text-lg"></TbClockQuestion>
                                <div className="font-bender">Future</div>
                            </div>
                            : <div className="flex items-center gap-1">
                                <FaClock></FaClock>
                                <div className="font-bender">{new Date(island.date).toLocaleDateString()}</div>
                            </div>
                    }
                </div>
            </OutlinedBox>
            <div className={clsx("", { "hidden": island.wip })}>
                <div className="absolute w-2 h-24 bg-neutral-900 dark:bg-neutral-50 -bottom-4 -right-4"></div>
                <div className="absolute w-8 h-2 bg-neutral-900 dark:bg-neutral-50 -bottom-4 right-36"></div>
                <div className="absolute w-36 h-2 bg-neutral-900 dark:bg-neutral-50 -bottom-4 -right-4"></div>
            </div>
        </div >
    );
}

function CardMain({ card }: { card: IslandMeta }) {
    return (
        <div>
            {getHeader(card)}
            <div>
                <h2 className=
                    "absolute font-bender font-bold leading-none pl-2 py-[2px] text-[10px] w-20 -top-1 left-3 text-neutral-50 dark:text-neutral-900 bg-neutral-900 dark:bg-neutral-50"
                >{`# ${card.id}`}</h2>
                {
                    card.ty == IslandType.Article && <DiagLines className="absolute right-5 size-10" scale="300%"></DiagLines>
                }
                <div className="flex flex-col">
                    <h1 className="font-sh-serif font-bold text-xl mb-1">{card.title}</h1>
                    <h2 className="font-sh-serif font-bold italic text-md mb-1">{card.subtitle}</h2>
                </div>
                <div className="flex mb-2">
                    <div className="w-20 h-1 bg-neutral-900 dark:bg-neutral-50"></div>
                    <div className="w-4 h-1 bg-neutral-900 dark:bg-neutral-50 ml-3"></div>
                    <div className="w-2 h-1 bg-neutral-900 dark:bg-neutral-50 ml-3"></div>
                </div>
                <p className="font-sh-sans text-ellipsis overflow-hidden line-clamp-6" style={{ width: "calc(100% - 80px)" }}>{card.desc}</p>
            </div>
        </div>
    );
}

function getHeader(card: IslandMeta) {
    switch (card.ty) {
        case IslandType.Achievement:
            return <AchievementCardHeader></AchievementCardHeader>;
        case IslandType.Article:
            return <ArticleCardHeader card={card}></ArticleCardHeader>;
        default: <div></div>
    }
}

function ArticleCardHeader({ card }: { card: IslandMeta }) {
    return (
        <div className="mb-2">
            {card.banner && <OutlinedBox className="w-full bg-cover" style={{ aspectRatio: "10 / 3", backgroundImage: `url(${OSS}/${card.id}/BANNER.png)` }}></OutlinedBox>}
        </div>
    );
}

function AchievementCardHeader() {
    return (
        <div className="flex items-center justify-center">
            <div className="hidden md:flex">
                <div className="bg-neutral-900 dark:bg-neutral-50 w-2 h-3 mr-2"></div>
                <div className="bg-neutral-900 dark:bg-neutral-50 w-6 h-3 mr-3"></div>
                <div className="bg-neutral-900 dark:bg-neutral-50 w-12 h-3 mr-4"></div>
            </div>
            <RiMedal2Line className="text-4xl"></RiMedal2Line>
            <h1 className="font-bender font-bold text-lg">Achievement Unlocked!</h1>
            <div className="hidden md:flex">
                <div className="bg-neutral-900 dark:bg-neutral-50 w-12 h-3 ml-4"></div>
                <div className="bg-neutral-900 dark:bg-neutral-50 w-6 h-3 ml-3"></div>
                <div className="bg-neutral-900 dark:bg-neutral-50 w-2 h-3 ml-2"></div>
            </div>
        </div>
    );
}
