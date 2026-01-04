export const SuccessList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 text-xs">
    {items.map((item, index) => (
      <li
        key={index}
        className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat"
      >
        {item}
      </li>
    ))}
  </ul>
);
