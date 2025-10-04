import { Card } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

export function IconCard({
  item,
  isSelected,
  onClick,
  radioId
}: {
  item: { id: string | number, name: string, icon?: React.ComponentType<{ className?: string }> },
  isSelected: boolean,
  onClick: () => void,
  radioId: string
}) {
  const Icon = item.icon;
  return (
    <Card
      className={`relative cursor-pointer p-3 gap-2 transition-all ring-1 ${
        isSelected
          ? "border-primary ring-primary bg-primary/5"
          : "border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2"
      }`}
      onClick={onClick}
    >
      <div className="absolute right-2">
        <RadioGroupItem
          value={item.id.toString()}
          id={radioId}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
      </div>
      {Icon && (
        <div className={`${isSelected ? "text-primary" : "text-muted-foreground"}`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h3
        className={`text-sm font-medium ${
          isSelected ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {item.name}
      </h3>
    </Card>
  );
}

export function ImageCard({
  item,
  isSelected,
  onClick,
  radioId,
  altPrefix = "",
  showRadioButton = true
}: {
  item: { id: string | number, name: string, seed?: string },
  isSelected: boolean,
  onClick: () => void,
  radioId?: string,
  altPrefix?: string,
  showRadioButton?: boolean
}) {
  return (
    <Card
      className={`py-0 gap-0 relative cursor-pointer overflow-hidden transition-all ring-1 ${
        isSelected
          ? "border-primary ring-primary bg-primary/5"
          : "border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2"
      }`}
      onClick={onClick}
    >
      {showRadioButton && radioId && (
        <div className="absolute right-2 top-2 z-10">
          <RadioGroupItem
            value={item.id.toString()}
            id={radioId}
            className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
        </div>
      )}
      <div className="aspect-[1/1] relative">
        <Image
          src={`https://picsum.photos/seed/${item.seed || `design${item.id}`}/200/200.jpg`}
          alt={`${altPrefix}${item.name}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-2">
        <h3
          className={`text-sm font-medium text-center ${
            isSelected ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {item.name}
        </h3>
      </div>
    </Card>
  );
}

export function TextCard({
  item,
  isSelected,
  onClick,
  radioId
}: {
  item: { id: string | number, name: string },
  isSelected: boolean,
  onClick: () => void,
  radioId: string
}) {
  return (
    <Card
      className={`relative cursor-pointer p-3 gap-2 transition-all ring-1 flex items-center justify-center ${
        isSelected
          ? "border-primary ring-primary bg-primary/5"
          : "border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2"
      }`}
      onClick={onClick}
    >
      <div className="absolute right-2 top-2">
        <RadioGroupItem
          value={item.id.toString()}
          id={radioId}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
      </div>
      <h3
        className={`text-sm font-medium ${
          isSelected ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {item.name}
      </h3>
    </Card>
  );
}