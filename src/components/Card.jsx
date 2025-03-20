import Icon from "./Icon.jsx";

export default function Card({ title, sites }) {
	return (
		<div className="flex flex-col gap-4">
			<span className="text-text-50 text-4xl text-center">{title}</span>
			<div className="p-8 bg-black/50 flex flex-col gap-10">
				{sites.map((site, key) => {
					return (
						<a
							href={site.url}
							className="text-text-100 text-2xl text-center flex flex-row justify-center items-start gap-4 cursor-pointer hover:scale-110 transition-transform duration-300"
							key={key}
						>
							<Icon
								name={site.icon}
								className={"mt-1 scale-110"}
								style={{ color: `#${site.color}` }}
							/>
							<span>{site.name}</span>
						</a>
					);
				})}
			</div>
		</div>
	);
}
