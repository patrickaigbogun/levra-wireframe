import TemplateHero from "@/components/templates/template_hero";
import RecentTemplatesHero from "@/components/templates/recent_templates_hero";
import getRecentTemplates from "@/lib/templates/getRecentTemplates";
import RecentTemplatesTable from "@/components/templates/recent_templates_table";
import { toast } from "react-toastify";
import { safeFetch } from "@/utils/safe-fetch";
import { Templates } from "@/types/templates";

export default async function TemplatePage() {

	  const { data, error } = await safeFetch(getRecentTemplates, {
		filter: true,
		coerce: true
	  });	  
	  const templates = data || []; 
	  if (error) console.error(error);
		  return (
		<section className=" space-y-28">
			<section className="">
				<TemplateHero />
			</section>
			<section className="">
				<RecentTemplatesHero />
				<RecentTemplatesTable templates={templates} />
			</section>
		</section>
	);
}
