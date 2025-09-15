```
"use client";

import{useState}from"react";
import{Card}from"@/components/ui/card";
import{Checkbox}from"@/components/ui/checkbox";
import{
BoundingBox,
Rainbow,
Ruler,
SmileGhost,
Swatches,
TypeText,
}from"@mynaui/icons-react";

// Define the customization options
constcustomizationOptions=[
{
id:"colors",
title:"Colors",
icon:<Swatches/>,
},
{
id:"shadows",
title:"Shadows and Blurs",
icon:<BoundingBox/>,
},
{
id:"typography",
title:"Typography",
icon:<TypeText/>,
},
{
id:"spacing",
title:"Spacing and Grid",
icon:<Ruler/>,
},
{
id:"emojis",
title:"Emojis",
icon:<SmileGhost/>,
},
{
id:"theming",
title:"Theming",
icon:<Rainbow/>,
},
];

exportdefaultfunctionCheckbox5(){
// Initialize with colors and emojis selected as shown in the image
const[selectedOptions,setSelectedOptions]=useState({
colors:true,
shadows:false,
typography:false,
spacing:false,
emojis:true,
theming:false,
});

// Toggle selection for an option
consttoggleOption=(id:string)=>{
setSelectedOptions((prev)=>({
...prev,
[id]:!prev[idaskeyoftypeofprev],
}));
};

return(
<divclassName="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
{customizationOptions.map((option)=>{
constisSelected=
selectedOptions[option.idaskeyoftypeofselectedOptions];

return(
<Card
key={option.id}
className={`relative cursor-pointer p-4 gap-3 transition-all ring-1 ${
isSelected?"border-primary ring-primary":"ring-transparent"
}`}
onClick={()=>toggleOption(option.id)}
>
<divclassName="absolute right-3 top-3">
<Checkbox
id={`checkbox-${option.id}`}
checked={isSelected}
onCheckedChange={()=>toggleOption(option.id)}
className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground rounded-full"
/>
</div>
<divclassName={`${isSelected?"text-primary":""}`}>
{option.icon}
</div>
<h3
className={`text-sm font-medium ${
isSelected?"text-primary":""
}`}
>
{option.title}
</h3>
</Card>
);
})}
</div>
);
}
```

hey the
