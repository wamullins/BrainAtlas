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
            title: "The Anatomy of the Human Frontal Lobe",
            abstract: `Throughout evolution the frontal lobes have progressively acquired a central role in most aspects of cognition and behavior. In humans, frontal lobe functions are conditional on the development of an intricate set of short- and long-range connections that guarantee direct access to sensory information and control over regions dedicated to planning and motor execution. Here the frontal cortical anatomy and the major connections that constitute the local and extended frontal connectivity are reviewed in the context of diffusion tractography studies, contemporary models of frontal lobe functions, and clinical syndromes. A particular focus of this chapter is the use of comparative anatomy and neurodevelopmental data to address the question of how frontal networks evolved and what this signified for unique human abilities`,
            url: "https://pubmed.ncbi.nlm.nih.gov/31590750/",
            citation:
                "Catani M. The anatomy of the human frontal lobe. Handb Clin Neurol. 2019;163:95-122. doi: 10.1016/B978-0-12-804281-6.00006-9. PMID: 31590750.",
            majorBrainRegionId: null,
            lobeId: lobeMap.get("Frontal Lobe"),
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Construction of the human forebrain",
            abstract: `The adult human brain is arguably the most complex of biological systems. It contains 86 billion neurons (the information processing cells of the brain) and many more support cells. The neurons, with the assistance of the support cells, form trillions of connections creating complex, interconnected neural networks that support all human thought, feeling, and action. A challenge for modern neuroscience is to provide a model that accounts for this exquisitely complex and dynamic system. One fundamental part of this model is an account of how the human brain develops. This essay describes two important aspects of this developmental story. The first part of the story focuses on the remarkable and dynamic set of events that unfold during the prenatal period to give rise to cell lineage that form the essential substance of the brain, particularly the structures of the cerebral hemispheres. The second part of the story focuses on the formation of the major brain pathways of the cerebrum, the intricate fiber bundles that connect different populations of neurons to form the information processing systems that support all human thought and action. These two aspects of early brain development provide an essential foundation for understanding how the structure, organization, and functioning of the human brain emerge.`,
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5182182/",
            citation:
                "Jernigan TL, Stiles J. Construction of the human forebrain. Wiley Interdiscip Rev Cogn Sci. 2017 Jan;8(1-2):10.1002/wcs.1409. doi: 10.1002/wcs.1409. Epub 2016 Dec 1. PMID: 27906520; PMCID: PMC5182182.",
            majorBrainRegionId: majorBrainRegionMap.get("Forebrainn"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "A Medley of Midbrain Maladies: A Brief Review of Midbrain Anatomy and Syndromology for Radiologists",
            abstract: `The midbrain represents the uppermost portion of the brainstem, containing numerous important nuclei and white matter tracts, most of which are involved in motor control, as well as the auditory and visual pathways. Notable midbrain nuclei include the superior and inferior colliculus nuclei, red nucleus, substantia nigra, oculomotor nuclear complex, and trochlear nucleus. In addition, white matter tracts include the brachium conjunctivum, medial and lateral lemniscus, spinothalamic tracts, and the fiber tracts within the cerebral peduncles. Although neurologically vital, many of these small midbrain nuclei and white matter tracts are not easily individually identified on neuroimaging. However, given their diverse functions, midbrain pathology often leads to distinct clinical syndromes. A review and understanding of the location and relationships between the different midbrain nuclei and fiber tracts will allow more precise correlation of radiologic findings with patient pathology and symptomatology. Particular syndromes associated with midbrain pathology include the Weber, Claude, Benedikt, Nothnagel, and Parinaud syndromes. The oculomotor and trochlear cranial nerves also reside at this level. An understanding of their functions as well as their projected courses from the midbrain towards the eye allows identification of distinct locations which are particularly vulnerable to pathology.`,
            url: "https://www.hindawi.com/journals/rrp/2012/258524/",
            citation:
                "Ruchalski K, Hathout GM. A medley of midbrain maladies: a brief review of midbrain anatomy and syndromology for radiologists. Radiol Res Pract. 2012;2012:258524. doi: 10.1155/2012/258524. Epub 2012 May 22. PMID: 22693668; PMCID: PMC3366251.",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Midbrain dopaminergic neurons: A review of the molecular circuitry that regulates their development",
            abstract: `Dopaminergic (DA) neurons of the ventral midbrain (VM) play vital roles in the regulation of voluntary movement, emotion and reward. They are divided into the A8, A9 and A10 subgroups. The development of the A9 group of DA neurons is an area of intense investigation to aid the generation of these neurons from stem cell sources for cell transplantation approaches to Parkinson's disease (PD). This review discusses the molecular processes that are involved in the identity, specification, maturation, target innervation and survival of VM DA neurons during development. The complex molecular interactions of a number of genetic pathways are outlined, as well as recent advances in the mechanisms that regulate subset identity within the VM DA neuronal pool. A thorough understanding of the cellular and molecular mechanisms involved in the development of VM DA neurons will greatly facilitate the use of cell replacement therapy for the treatment of PD.`,
            url: "https://www.sciencedirect.com/science/article/pii/S0012160613001942?via%3Dihub",
            citation:
                "Hegarty SV, Sullivan AM, O'Keeffe GW. Midbrain dopaminergic neurons: a review of the molecular circuitry that regulates their development. Dev Biol. 2013 Jul 15;379(2):123-38. doi: 10.1016/j.ydbio.2013.04.014. Epub 2013 Apr 18. PMID: 23603197.",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Functional connectivity and network analysis of midbrain and brainstem nuclei",
            abstract: `There is limited understanding of how monoamine-producing nuclei within midbrain and brainstem contribute to the formation and functional dynamics of brain networks across the human neocortex. We used resting state fMRI in 154 healthy participants to elucidate patterns of functional connectivity and network organization between cortical/subcortical regions and midbrain/brainstem nuclei.

            By means of univariate functional connectivity and graph-based analysis, we show that dopaminergic midbrain centers and the serotonergic dorsal raphe nucleus (DRN) are functionally integrated with the default mode network (DMN), whereas the remaining serotonergic raphe nuclei and the noradrenergic locus coeruleus are functionally integrated with the executive-control network (ECN). The majority of midbrain/brainstem nuclei show a high level of connectedness to other network modules classifying these nuclei as “connector” hubs. The additionally applied probabilistic independent component analysis (PICA) broadly corresponded with the results of the GT analysis, describing similar functionally-relevant cortical networks. Since monoaminergic neurotransmission is essential to neocortical function, and represents an important target for pharmacotherapy, our novel findings contribute to a comprehensive understanding of the functional organization of the human brain.`,
            url: "https://www.sciencedirect.com/science/article/abs/pii/S1053811916300155?via%3Dihub",
            citation:
                "Bär KJ, de la Cruz F, Schumann A, Koehler S, Sauer H, Critchley H, Wagner G. Functional connectivity and network analysis of midbrain and brainstem nuclei. Neuroimage. 2016 Jul 1;134:53-63. doi: 10.1016/j.neuroimage.2016.03.071. Epub 2016 Apr 1. PMID: 27046112.",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Midbrain circuits for defensive behaviour",
            abstract: `Survival in threatening situations depends on the selection and rapid execution of an appropriate active or passive defensive response, yet the underlying brain circuitry is not understood. Here we use circuit-based optogenetic, in vivo and in vitro electrophysiological, and neuroanatomical tracing methods to define midbrain periaqueductal grey circuits for specific defensive behaviours. We identify an inhibitory pathway from the central nucleus of the amygdala to the ventrolateral periaqueductal grey that produces freezing by disinhibition of ventrolateral periaqueductal grey excitatory outputs to pre-motor targets in the magnocellular nucleus of the medulla. In addition, we provide evidence for anatomical and functional interaction of this freezing pathway with long-range and local circuits mediating flight. Our data define the neuronal circuitry underlying the execution of freezing, an evolutionarily conserved defensive behaviour, which is expressed by many species including fish, rodents and primates. In humans, dysregulation of this 'survival circuit' has been implicated in anxiety-related disorders.`,
            url: "https://www.nature.com/articles/nature17996",
            citation:
                "Tovote P, Esposito MS, Botta P, Chaudun F, Fadok JP, Markovic M, Wolff SB, Ramakrishnan C, Fenno L, Deisseroth K, Herry C, Arber S, Lüthi A. Midbrain circuits for defensive behaviour. Nature. 2016 Jun 9;534(7606):206-12. doi: 10.1038/nature17996. Epub 2016 Jun 1. PMID: 27279213.",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: true,
        }),
        new Article({
            title: "Midbrain dopamine and prefrontal function in humans: interaction and modulation by COMT genotype",
            abstract: `Using multimodal neuroimaging in humans, we demonstrate specific interactions between prefrontal activity and midbrain dopaminergic synthesis. A common V(108/158)M substitution in the gene for catecholamine-O-methyltransferase (COMT), an important enzyme regulating prefrontal dopamine turnover, predicted reduced dopamine synthesis in midbrain and qualitatively affected the interaction with prefrontal cortex. These data implicate a dopaminergic tuning mechanism in prefrontal cortex and suggest a systems-level mechanism for cognitive and neuropsychiatric associations with COMT.`,
            url: "https://www.researchgate.net/publication/7914532_Midbrain_dopamine_and_prefrontal_function_in_humans_interaction_and_modulation_by_COMT_genotype",
            citation:
                "Meyer-Lindenberg A, Kohn PD, Kolachana B, Kippenhan S, McInerney-Leo A, Nussbaum R, Weinberger DR, Berman KF. Midbrain dopamine and prefrontal function in humans: interaction and modulation by COMT genotype. Nat Neurosci. 2005 May;8(5):594-6. doi: 10.1038/nn1438. Epub 2005 Apr 10. PMID: 15821730.",
            majorBrainRegionId: majorBrainRegionMap.get("Midbrain"),
            lobeId: null,
            structureROIId: null,
            approved: false,
        }),
        new Article({
            title: "Neuroanatomy, Superior Colliculus",
            abstract: `The superior colliculus is a paired structure in the rostral midbrain that is involved in incorporating environmental stimuli and coordinating gaze shifts involving both eye and head movements. It is known as the optic tectum in other vertebrates and contains a topographic map of the contralateral visual field, as well as other inputs from somatosensory and auditory pathways.`,
            url: "https://www.ncbi.nlm.nih.gov/books/NBK544224/",
            citation:
                "Zubricky RD, M Das J. Neuroanatomy, Superior Colliculus. [Updated 2022 Jul 25]. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2023 Jan-.",
            majorBrainRegionId: null,
            lobeId: null,
            structureROIId: structureROIMap.get("Colliculi"),
            approved: false,
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
