const db = require("../db");
const { Article, Lobe, MajorBrainRegion, StructureROI } = require("../models");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const createMajorBrainRegions = async () => {
    const majorBrainRegions = [
        new MajorBrainRegion({
            name: "Forebrain",
            description: `By far the largest region of your brain is the forebrain (derived from the developmental prosencephalon), which contains the entire cerebrum and several structures directly nestled within it - the thalamus, hypothalamus, the pineal gland and the limbic system.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/forebrain",
            highlightImageFile: "https://qbi.uq.edu.au/files/28002/Basic-brain-anatomy.jpg",
        }),
        new MajorBrainRegion({
            name: "Midbrain",
            description: `Located towards the base of your brain is a small but important region called the midbrain (derived from the developmental mesencephalon), which serves as a vital connection point between the other major regions of the brain - the forebrain and the hindbrain.

            The midbrain is the topmost part of the brainstem, the connection central between the brain and the spinal cord. There are three main parts of the midbrain - the colliculi, the tegmentum, and the cerebral peduncles. Of the 12 cranial nerves, two thread directly from the midbrain - the oculomotor and trochlear nerves, responsible for eye and eyelid movement.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/midbrain",
            highlightImageFile: "https://qbi.uq.edu.au/files/28100/midbrain.png",
        }),
        new MajorBrainRegion({
            name: "Hindbrain",
            description: `The hindbrain (developmentally derived from the rhombencephalon) is one of the three major regions of our brains, located at the lower back part of the brain. It includes most of the brainstem and a dense coral-shaped structure called the cerebellum. The brainstem is one of the most important parts of the entire central nervous system, because it connects the brain to the spinal cord and coordinates many vital functions, such as breathing and heartbeat.

            There are three main parts of the hindbrain - pons, cerebellum, and medulla oblongata. Most of the 12 cranial nerves are found in the hindbrain.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/hindbrain",
            highlightImageFile: "https://qbi.uq.edu.au/files/28112/forebrain-midbrain-hindbrain.png",
        }),
    ];

    await MajorBrainRegion.insertMany(majorBrainRegions);
    console.log("created major brain regions");
    return majorBrainRegions;
};

const createLobes = async (majorBrainRegions) => {
    // creates a new key value pairing wehre the key is the name and the value is the whole object
    const majorBrainRegionMap = new Map(majorBrainRegions.map((region) => [region.name, region._id]));

    const lobes = [
        new Lobe({
            name: "Frontal Lobe",
            description: `The frontal lobe is separated from the parietal lobe by a space called the central sulcus, and from the temporal lobe by the lateral sulcus.

            The frontal lobe is generally where higher executive functions including emotional regulation, planning, reasoning and problem solving occur. This is why in frontotemporal dementia, personality changes are often the first signs of the disease.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/lobes-brain",
            highlightImageFile: "https://qbi.uq.edu.au/files/27797/Lobes-of-the-brain-QBI.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
        }),
        new Lobe({
            name: "Parietal Lobe",
            description:
                "The parietal lobe is behind the frontal lobe, separated by the central sulcus. Areas in the parietal lobe are responsible for integrating sensory information, including touch, temperature, pressure and pain. ",
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/lobes-brain",
            highlightImageFile: "https://qbi.uq.edu.au/files/27797/Lobes-of-the-brain-QBI.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
        }),
        new Lobe({
            name: "Temporal Lobe",
            description: `Separated from the frontal lobe by the lateral fissure, the temporal lobe also contains regions dedicated to processing sensory information, particularly important for hearing, recognising language, and forming memories. `,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/lobes-brain",
            highlightImageFile: "https://qbi.uq.edu.au/files/27797/Lobes-of-the-brain-QBI.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
        }),
        new Lobe({
            name: "Occipital Lobe",
            description: `The visual cortex is the primary cortical region of the brain that receives, integrates, and processes visual information relayed from the retinas. It is in the occipital lobe of the primary cerebral cortex, which is in the most posterior region of the brain. The visual cortex divides into five different areas (V1 to V5) based on function and structure. Visual information from the retinas that are traveling to the visual cortex first passes through the thalamus, where it synapses in a nucleus called the lateral geniculate. This information then leaves the lateral geniculate and travels to V1, the first area of the visual cortex. V1 is also known as the primary visual cortex and centers around the calcarine sulcus.`,
            descriptionCitation: "https://www.ncbi.nlm.nih.gov/books/NBK482504/",
            highlightImageFile: "https://qbi.uq.edu.au/files/27797/Lobes-of-the-brain-QBI.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
        }),
    ];

    await Lobe.insertMany(lobes);
    console.log("created lobes");
    return lobes;
};

const createStructureROIs = async (majorBrainRegions, lobes) => {
    const majorBrainRegionMap = new Map(majorBrainRegions.map((region) => [region.name, region._id]));
    const lobeMap = new Map(lobes.map((lobe) => [lobe.name, lobe._id]));

    const structureROIs = [
        /// additional forebrain structures
        new StructureROI({
            name: "Thalamus",
            description: `The thalamus consists of two lobes of grey matter tucked away right under the cerebral cortex. It is a prime processing centre for sensory information, as it links up the relevant parts of the cerebral cortex with the spinal cord and other areas of the brain important for our senses. The thalamus also controls sleep.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/forebrain",
            highlightImageFile:
                "https://my.clevelandclinic.org/-/scassets/images/org/health/articles/22652-thalamus.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Hypothalamus",
            description: `The hypothalamus is quite small, only about the size of an almond. As its name suggests, it can be found right underneath the thalamus, and despite its small size it is actually the major control centre of the autonomic motor system. It is involved in some hormonal activity and connects the hormonal and nervous systems. The hypothalamus also works to regulate things like our blood pressure, body temperature, and overall homeostasis.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/forebrain",
            highlightImageFile:
                "https://my.clevelandclinic.org/-/scassets/images/org/health/articles/22566-hypothalamus",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Amygdala",
            description: `The amygdala is primarily involved in the processing of emotions and memories associated with fear. The amygdala is part of the limbic system within the brain and is key to how we process strong emotions like fear or pleasure.

            As the amygdala has connections to many other brain structures, this means it can link to areas in order to process ‘higher’ cognitive information with systems that control ‘lower’ functions (such as autonomic responses like breathing, touch, and sensitivity).
            
            This allows the amygdala to organize physiological responses based on the cognitive information available. The most well-known example of this is the fight-or-flight response.`,
            descriptionCitation: "https://www.simplypsychology.org/amygdala.html",
            highlightImageFile: "https://my.clevelandclinic.org/-/scassets/images/org/care-pages/neuro/24894-amygdala",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Hippocampus",
            description: `Hippocampus is a complex brain structure embedded deep into temporal lobe. It has a major role in learning and memory. It is a plastic and vulnerable structure that gets damaged by a variety of stimuli. Studies have shown that it also gets affected in a variety of neurological and psychiatric disorders. In last decade or so, lot has been learnt about conditions that affect hippocampus and produce changes ranging from molecules to morphology. Progresses in radiological delineation, electrophysiology, and histochemical characterization have made it possible to study this archicerebral structure in greater detail. Present paper attempts to give an overview of hippocampus, both in health and diseases.`,
            descriptionCitation:
                "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3548359/#:~:text=Hippocampus%20is%20a%20complex%20brain,of%20neurological%20and%20psychiatric%20disorders.",
            highlightImageFile:
                "https://upload.wikimedia.org/wikipedia/commons/5/5b/Hippocampus_and_seahorse_cropped.JPG",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Pituitary Gland",
            description: `The pituitary gland is sometimes called the "master" gland of the endocrine system because it controls the functions of many of the other endocrine glands. The pituitary gland is no larger than a pea, and is located at the base of the brain. The gland is attached to the hypothalamus (a part of the brain that affects the pituitary gland) by nerve fibers and blood vessels. The pituitary gland itself consists of 2 major structures: Anterior Lobe and Posterior Lobe. 
            Anterior Lobe: Growth hormone, Prolactin (to stimulate milk production in the female breast), ACTH (adrenocorticotropic hormone which regulates the adrenal glands ), TSH (thyroid-stimulating hormone which regulates the thyroid gland ), FSH (follicle-stimulating hormone which regulates the ovaries and testes), LH (luteinizing hormone which regulates the ovaries or testes)
            Posterior Lobe: ADH (antidiuretic hormone is actually produced in the hypothalamus and stored in the pituitary gland; it increases absorption of water by the kidneys. It also increases blood pressure), Oxytocin (to contract the uterus during childbirth and stimulate the release of milk during breastfeeding)`,
            descriptionCitation:
                "https://www.hopkinsmedicine.org/health/conditions-and-diseases/the-pituitary-gland#:~:text=The%20pituitary%20gland%20is%20sometimes,the%20base%20of%20the%20brain.",
            highlightImageFile: "https://www.ohsu.edu/sites/default/files/2020-01/pituitary-gland-anatomy.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Corpus Collosum",
            description: `The corpus callosum is the primary commissural region of the brain consisting of white matter tracts that connect the left and right cerebral hemispheres. It is composed of approximately 200 million heavily myelinated nerve fibers that form homotopic or heterotopic projections to contralateral neurons in the same anatomical layer. The primary function of the corpus callosum is to integrate and transfer information from both cerebral hemispheres to process sensory, motor, and high-level cognitive signals.`,
            descriptionCitation:
                "https://www.ncbi.nlm.nih.gov/books/NBK448209/#:~:text=The%20corpus%20callosum%20is%20the,left%20and%20right%20cerebral%20hemispheres.",
            highlightImageFile:
                "https://www.kenhub.com/thumbor/M11E1txCDUFARhLpEduqLRPixpI=/fit-in/800x1600/filters:watermark(/images/logo_url.png,-10,-10,0):background_color(FFFFFF):format(jpeg)/images/library/1856/K0N85HhHdfNuTbpyntCTuA_Corpus_callosum_1.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Basal Ganglia",
            description: `The “basal ganglia” refers to a group of subcortical nuclei responsible primarily for motor control, as well as other roles such as motor learning, executive functions and behaviors, and emotions.`,
            descriptionCitation:
                "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3543080/#:~:text=The%20%E2%80%9Cbasal%20ganglia%E2%80%9D%20refers%20to,functions%20and%20behaviors%2C%20and%20emotions.",
            highlightImageFile:
                "https://upload.wikimedia.org/wikipedia/commons/8/85/Basal_ganglia_and_related_structures_%282%29.svg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: null,
        }),

        /// lobe specific forebrain structures

        new StructureROI({
            name: "Prefrontal cortex",
            description: `The prefrontal cortex (PFC) is the cerebral cortex covering the front part of the frontal lobe. This brain region has been implicated in planning complex cognitive behavior, personality expression, decision making, and moderating social behaviour. The basic activity of this brain region is considered to be orchestration of thoughts and actions in accordance with internal goals. The most typical psychological term for functions carried out by the prefrontal cortex area is executive function. Executive function relates to abilities to differentiate among conflicting thoughts, determine good and bad, better and best, same and different, future consequences of current activities, working toward a defined goal, prediction of outcomes, expectation based on actions, and social “control” (the ability to suppress urges that, if not suppressed, could lead to socially unacceptable outcomes). The frontal cortex supports concrete rule learning, while more anterior regions along the rostro-caudal axis of the frontal cortex support rule learning at higher levels of abstraction. `,
            descriptionCitation:
                "https://www.thescienceofpsychotherapy.com/prefrontal-cortex/#:~:text=The%20prefrontal%20cortex%20(PFC)%20is,making%2C%20and%20moderating%20social%20behaviour.",
            highlightImageFile: "https://www.newfrontierspsychiatry.com/wp-content/uploads/2019/09/5.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Frontal Lobe"),
        }),
        new StructureROI({
            name: "Brocca's Area",
            description: `Broca’s area is a key component of a complex speech network, interacting with the flow of sensory information from the temporal cortex, devising a plan for speaking and passing that plan along to the motor cortex, which controls the movements of the mouth.`,
            descriptionCitation:
                "https://www.hopkinsmedicine.org/news/media/releases/brocas_area_is_the_brains_scriptwriter_shaping_speech_study_finds#:~:text=Broca's%20area%20is%20a%20key,the%20movements%20of%20the%20mouth.",
            highlightImageFile: "https://neuroscientificallychallenged.com/files/images/brocas-area.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Frontal Lobe"),
        }),

        new StructureROI({
            name: "Somatosensory cortex",
            description: `The somatosensory cortex is a region of the brain that is responsible for receiving and processing sensory information from across the body, such as touch, temperature, and pain.

            This cortex is located within the which is located in the postcentral gyrus of the parietal lobe and lies behind the primary motor cortex of the frontal lobe.`,
            descriptionCitation:
                "https://www.simplypsychology.org/somatosensory-cortex.html#:~:text=The%20somatosensory%20cortex%20is%20a,touch%2C%20temperature%2C%20and%20pain.",
            highlightImageFile:
                "https://www.simplypsychology.org/wp-content/uploads/primary_somatic_sensory_cortex.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Parietal Lobe"),
        }),
        new StructureROI({
            name: "Angular Gyrus",
            description: `The angular gyrus (AG) is a hub of several networks that are involved in various functions, including attention, self-processing, semantic information processing, emotion regulation, and mentalizing.`,
            descriptionCitation:
                "https://www.frontiersin.org/articles/10.3389/fnhum.2019.00092/full#:~:text=The%20angular%20gyrus%20(AG)%20is,a%20role%20in%20music%20performance.",
            highlightImageFile:
                "https://www.kenhub.com/thumbor/QRKrzUgiN0Hhz6yvijgu4PxGCAI=/fit-in/800x1600/filters:watermark(/images/logo_url.png,-10,-10,0):background_color(FFFFFF):format(jpeg)/images/library/3768/9cWZlViXbikyMFXXbaKXQ_Lobulus_parietalis_inferior__Gyrus_supramarginalis_01.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Parietal Lobe"),
        }),

        new StructureROI({
            name: "Superior Temporal Gyrus",
            description: `he superior temporal gyrus (STG) is involved in auditory processing, including language, but also has been implicated as a critical structure in social cognition`,
            descriptionCitation: "https://pubmed.ncbi.nlm.nih.gov/17488217/",
            highlightImageFile: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Superior_temporal_gyrus.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Temporal Lobe"),
        }),

        new StructureROI({
            name: "Temporal Pole",
            description: `The temporal pole (TP) has been involved in multiple functions from emotional and social behavior, semantic processing, memory, language in humans and epilepsy surgery, to the fronto-temporal neurodegenerative disorder (semantic) dementia.`,
            descriptionCitation:
                "https://www.frontiersin.org/articles/10.3389/fnins.2019.01099/full#:~:text=The%20temporal%20pole%20(TP)%20has,neurodegenerative%20disorder%20(semantic)%20dementia.",
            highlightImageFile:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Poles_of_cerebral_hemispheres_%28en%29_-_inferiror_view.png/575px-Poles_of_cerebral_hemispheres_%28en%29_-_inferiror_view.png",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Temporal Lobe"),
        }),

        new StructureROI({
            name: "Primary Visual Cortex",
            description: `V1 is the first of the cortical regions to receive and process information and also the best-understood portion of the visual cortex. V1 is divided up into six distinct layers, each comprising different cell-types and functions. Notably, layer 4 is the location that receives information from the lateral geniculate. Layer 4 is also the layer that has the highest concentration of simple cells. Complex cells, on the other hand, can be found in layers 2, 3, and 6. V1 responds to simple visual components such as orientation and direction. The summation of this information provides the foundation for more complicated pattern recognition later in the visual stream.`,
            descriptionCitation: "https://www.ncbi.nlm.nih.gov/books/NBK482504/",
            highlightImageFile:
                "https://2.bp.blogspot.com/-BYupR8IaUKY/UF3cB-hzR0I/AAAAAAAAAfw/OuKJo9CEGVU/s1600/VisualCortex.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Occipital Lobe"),
        }),
        new StructureROI({
            name: "Secondary Visual Cortex",
            description: `V2 receives integrated information from V1 and subsequently has an increased level of complexity and response patterns to objects. Researchers have recorded cells in this region responding to differences in color, spatial frequency, moderately complex patterns, and object orientation.[5] V2 sends feedback connections to V1 and has feedforward connections with V3-V5. Information leaving the second visual area splits into the dorsal and ventral streams, which specialize in processing different aspects of visual information. The former is often described as being concerned with object recognition while the latter focuses on spatial tasks and visual-motor skills.`,
            descriptionCitation: "https://www.ncbi.nlm.nih.gov/books/NBK482504/",
            highlightImageFile:
                "https://2.bp.blogspot.com/-BYupR8IaUKY/UF3cB-hzR0I/AAAAAAAAAfw/OuKJo9CEGVU/s1600/VisualCortex.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrain"),
            lobeId: lobeMap.get("Occipital Lobe"),
        }),

        /// midbrain structures
        new StructureROI({
            name: "Colliculi",
            description: `At the top of the midbrain are the colliculi, which derives its name from the Latin word for ‘hill. It contains two pairs of bulging, layered bundles of neurons called the superior and inferior colliculi. The superior ones work on preliminary processing of visual signals before they are passed on to the occipital lobe at the back of the head. The inferior ones do work on auditory signals before those are passed through the thalamus to the main auditory processing centre in the cortex.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/midbrain",
            highlightImageFile: "https://homework.study.com/cimages/multimages/16/brain_stem6259622121749573516.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Tectum",
            description: `The tectum is the region of the midbrain posterior to the cerebral aqueduct of Sylvius. It contains the nuclei of the superior and inferior colliculi. These colliculi are involved in preliminary processing of the visual (superior colliculi) or auditory stimuli (inferior colliculi) before they reach their corresponding primary processing centers.`,
            descriptionCitation: "https://www.kenhub.com/en/library/anatomy/midbrain-pons-nuclei-tracts",
            highlightImageFile:
                "https://prod-images-static.radiopaedia.org/images/62190918/c2aef55401a2f1bf51ff322ec76767c9e5c52428c4c5a8ebd66cb97c544780af_gallery.jpeg",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Tegmentum",
            description: `The tegmentum (Latin for ‘hood’) actually stretches down the length of the brainstem, but a portion of it forms a part of the midbrain. It contains two areas named after specific colours: the iron-rich red nucleus (which actually looks pink) is involved in the coordination of movements; the periaqueductal grey is a dense region of grey matter and is involved in suppressing pain. The tegmentum in the midbrain also contains connections that play a role in keeping us alert.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/midbrain",
            highlightImageFile:
                "https://prod-images-static.radiopaedia.org/images/62190918/c2aef55401a2f1bf51ff322ec76767c9e5c52428c4c5a8ebd66cb97c544780af_gallery.jpeg",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
        }),
        /// hindbrain structures
        new StructureROI({
            name: "Pons",
            description: `The pons gets its name from the Latin word for ‘bridge’, and it connects the rest of the brainstem to the cerebral cortex. Bulbous in shape, it sits right underneath the midbrain and serves as a coordination centre for signals and communications that flow between the two brain hemispheres and the spinal cord.

            Four cranial nerves are found in the pons: the abducens nerve helps coordinate eye movement; the facial nerve coordinates movement and sensation in the face; the vestibulocochlear nerve processes sounds and helps us maintain balance; and the trigeminal nerve coordinates chewing and carries sensory information from the face and the head.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/hindbrain",
            highlightImageFile: "https://qbi.uq.edu.au/files/28112/forebrain-midbrain-hindbrain.png",
            majorBrainRegionId: majorBrainRegionMap.get("Hindbrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Cerebellum",
            description: `Behind the pons and the rest of the brainstem sits a structure called the cerebellum (Latin for ‘little brain’). In cross-section, this part looks like a layered, wrinkly coral. Just like the cortex, it has two hemispheres, with a dense layer of grey matter surrounding an inner region of white matter. It also contains special neurons called Purkinje cells, capable of processing many signals at once due to their highly complex dendrite branches.

            The cerebellum coordinates our sensations with responses from our muscles, enabling most of our voluntary movements. It also processes nerve impulses from the inner ear and coordinates them with muscle movement, thus helping us maintain balance and posture.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/hindbrain",
            highlightImageFile: "https://nba.uth.tmc.edu/neuroscience/m/s3/images/copyright_marked_images/5-3_NEW.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Hindbrain"),
            lobeId: null,
        }),
        new StructureROI({
            name: "Medulla Oblongata",
            description: `The lower part of both the brainstem and the overall hindbrain is the medulla oblongata, where the brain transitions to the spinal cord. It is only about 3cm long, but the medulla is an indispensable nerve tract which contains the control centres for our autonomic vital functions - heart rate, blood pressure, breathing - and many involuntary reflexes such as swallowing and sneezing.

            The medulla contains both white and grey matter, and four cranial nerves stem from this region: the glossopharyngeal nerve coordinates some taste sensations and mouth movements; the vagus nerve controls mouth movements, voice and the gag reflex; the accessory nerve coordinates head and neck movements; and the hypoglossal nerve controls tongue movements and muscles involved in our speech.`,
            descriptionCitation: "https://qbi.uq.edu.au/brain/brain-anatomy/hindbrain",
            highlightImageFile: "https://teachmeanatomy.info/wp-content/uploads/Anterior-Surface-of-the-Medulla.jpg",
            majorBrainRegionId: majorBrainRegionMap.get("Hindbrain"),
            lobeId: null,
        }),
    ];

    await StructureROI.insertMany(structureROIs);
    console.log("created Structures and ROIs");
    return structureROIs;
};

const createArticles = async (majorBrainRegions, lobes, structureROIs) => {
    const majorBrainRegionMap = new Map(majorBrainRegions.map((region) => [region.name, region._id]));
    const lobeMap = new Map(lobes.map((lobe) => [lobe.name, lobe._id]));
    const structureROIMap = new Map(structureROIs.map((str) => [str.name, str._id]));

    const articles = [
        new Article({
            title: "Article about the frontal lobe",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: null,
            lobeId: lobeMap.get("Frontal Lobe"),
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Article about the midbrain",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Article 2 about the midbrain",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Article 3 about the midbrain",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Article 4 about the midbrain",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: false,
        }),
        new Article({
            title: "Article about the Hippocampus",
            abstract: "abstract",
            url: "this is the url right here",
            citation: "love a good citation",
            majorBrainRegionId: null,
            lobeId: null,
            structureROIId: structureROIMap.get("Hippocampus"),
            approved: true,
        }),
    ];
    await Article.insertMany(articles);
    console.log("created articles");
};

const run = async () => {
    await MajorBrainRegion.deleteMany({});
    await Lobe.deleteMany({});
    await StructureROI.deleteMany({});
    await Article.deleteMany({});
    const majorBrainRegions = await createMajorBrainRegions();
    const lobes = await createLobes(majorBrainRegions);
    const structureROIs = await createStructureROIs(majorBrainRegions, lobes);
    await createArticles(majorBrainRegions, lobes, structureROIs);
    db.close();
};

run();
